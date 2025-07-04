import {Ratelimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"

import dotenv from "dotenv"

dotenv.config()

//ratelimiter that allows 5 requests per 20 sec
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter:  Ratelimit.slidingWindow(80, "60s")
})

export default ratelimit