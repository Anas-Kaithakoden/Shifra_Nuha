/**
 * ---------------------------------------------------------------------------
 * RATE LIMIT
 * ---------------------------------------------------------------------------
 * A best-effort, per-isolate in-memory limiter. It is deliberately simple:
 *
 *  - It needs no binding, no database and no extra service, which is the right
 *    trade-off for a marketing site whose chat is not a paid API product.
 *  - It is NOT a global limit. Cloudflare may run several isolates, and each
 *    has its own map, so a determined caller can exceed the nominal number.
 *    That is documented rather than hidden: this stops accidental loops and
 *    casual abuse, not a botnet.
 *  - If the business later needs a hard global limit, the same interface can be
 *    backed by a Durable Object, KV or Cloudflare's rate-limiting rules.
 */

type Bucket = {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()
const MAX_BUCKETS = 10_000

export type RateLimitResult = {
  allowed: boolean
  limit: number
  remaining: number
  retryAfterSeconds: number
  resetAt: number
}

/** Test-only seam. Production code has no way to call this. */
export function resetRateLimits(): void {
  buckets.clear()
}

function prune(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key)
  }

  // A map with an unbounded key space is a memory leak waiting to happen. If
  // expiry alone did not shrink it enough, drop the oldest entries.
  if (buckets.size > MAX_BUCKETS) {
    const excess = buckets.size - MAX_BUCKETS
    let removed = 0
    for (const key of buckets.keys()) {
      buckets.delete(key)
      if (++removed >= excess) break
    }
  }
}

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now = Date.now(),
): RateLimitResult {
  if (buckets.size > 500) prune(now)

  const existing = buckets.get(key)

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs
    buckets.set(key, { count: 1, resetAt })
    return {
      allowed: true,
      limit,
      remaining: Math.max(0, limit - 1),
      retryAfterSeconds: Math.ceil(windowMs / 1000),
      resetAt,
    }
  }

  existing.count += 1
  const allowed = existing.count <= limit

  return {
    allowed,
    limit,
    remaining: Math.max(0, limit - existing.count),
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    resetAt: existing.resetAt,
  }
}

/** Best-effort client identity. Cloudflare sets `cf-connecting-ip` at the edge. */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return (
    request.headers.get('cf-connecting-ip')?.trim() ||
    request.headers.get('x-real-ip')?.trim() ||
    forwarded ||
    'anonymous'
  )
}

/** Called after the map grows, so an idle isolate does not hold memory forever. */
export function sweepRateLimits(now = Date.now()): void {
  if (buckets.size > 0) prune(now)
}
