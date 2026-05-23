Good.
Now we are fixing this PROPERLY at architecture level.

Your requirement is:

```txt id="cwk0g9"
I want automatic terminal logs everywhere by default
without adding flags manually during startup.
```

Correct.

That means:

* centralized logger
* automatic request logging
* automatic service logging
* automatic exception logging
* automatic startup logging
* automatic AI logs
* automatic embedding logs
* automatic DB logs

ALL enabled permanently.

---

# ROOT PROBLEM IN YOUR CURRENT APP

Your current setup is broken because:

## 1. Wrong Loguru formatting

You are using:

```python id="1u97p2"
logger.info("Stored %s commits", count)
```

That is NOT proper Loguru usage.

---

## 2. Uvicorn logger suppression

Your app is suppressing:

* uvicorn
* access logs
* debug logs

---

## 3. No centralized logger bootstrap

Different files are logging inconsistently.

---

# NOW WE FIX EVERYTHING PROPERLY

---

# STEP 1 — CREATE CENTRAL LOGGER

CREATE:

```txt id="8xqjlwm"
app/core/logger.py
```

REPLACE ENTIRE FILE WITH:

```python id="e0ljlwm"
import sys

from loguru import logger


logger.remove()


logger.add(
    sys.stdout,
    colorize=True,
    backtrace=True,
    diagnose=True,
    enqueue=True,
    level="DEBUG",
    format=(
        "<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> | "
        "<level>{level: <8}</level> | "
        "<cyan>{name}</cyan>:"
        "<cyan>{function}</cyan>:"
        "<cyan>{line}</cyan> | "
        "{message}"
    )
)


logger.info("🚀 Logger initialized")
```

---

# WHAT THIS DOES

This automatically enables:

* colored logs
* DEBUG logs
* stack traces
* async-safe logs
* full terminal visibility

WITHOUT startup flags.

---

# STEP 2 — REMOVE UVICORN LOG SUPPRESSION

In:

```txt id="t6vjlwm"
app/main.py
```

REMOVE ALL OF THIS:

```python id="dxzjlwm"
logging.getLogger("uvicorn").setLevel(logging.WARNING)
logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
logging.getLogger("uvicorn.error").setLevel(logging.WARNING)
```

DELETE completely.

---

# STEP 3 — IMPORT LOGGER GLOBALLY

In EVERY important file:

ADD:

```python id="nprjlwm"
from app.core.logger import logger
```

---

# IMPORTANT FILES

## API

```txt id="jlwm2u"
app/api/github_webhook.py
```

---

## LLM

```txt id="jlwm6q"
app/services/llm_service.py
```

---

## EMBEDDINGS

```txt id="jlwm9j"
app/services/embedding_service.py
```

---

## GITHUB SERVICE

```txt id="jlwm5d"
app/services/github_service.py
```

---

## DATABASE

```txt id="jlwm7s"
app/db/
```

---

# STEP 4 — FIX ALL LOGURU USAGE

THIS IS CRITICAL.

---

# WRONG

```python id="9jlwm0"
logger.info("Stored %s commits", count)
```

---

# CORRECT

USE F-STRINGS EVERYWHERE.

```python id="7jlwm4"
logger.info(f"📦 Stored {count} commits")
```

---

# WRONG

```python id="4jlwm2"
logger.error("Failed repo=%s", repo)
```

---

# CORRECT

```python id="6jlwm1"
logger.error(f"❌ Failed repo={repo}")
```

---

# YOU MUST FIX THIS EVERYWHERE

Search globally:

```txt id="3jlwm5"
%s
%d
```

inside logger statements.

Replace ALL.

---

# STEP 5 — ADD AUTOMATIC REQUEST LOGGING

CREATE:

```txt id="2jlwm9"
app/middleware/request_logging.py
```

PASTE:

```python id="1jlwm7"
import time
import uuid

from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request

from app.core.logger import logger


class RequestLoggingMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request: Request, call_next):

        request_id = str(uuid.uuid4())[:8]

        start = time.time()

        logger.info(
            f"📥 [{request_id}] "
            f"{request.method} {request.url.path}"
        )

        response = await call_next(request)

        duration = round(
            (time.time() - start) * 1000,
            2
        )

        logger.success(
            f"📤 [{request_id}] "
            f"{response.status_code} "
            f"{duration}ms"
        )

        return response
```

---

# REGISTER IT

In:

```txt id="0jlwm6"
app/main.py
```

ADD:

```python id="8jlwm8"
from app.middleware.request_logging import RequestLoggingMiddleware
```

Then:

```python id="5jlwm3"
app.add_middleware(RequestLoggingMiddleware)
```

---

# NOW EVERY REQUEST AUTO LOGS

Like:

```txt id="9jlwm6"
📥 [a81c9d2f] POST /api/github/webhook
📤 [a81c9d2f] 200 1812ms
```

WITHOUT MANUAL CODE.

---

# STEP 6 — ADD WEBHOOK LIFECYCLE LOGS

Inside:

```txt id="4jlwm8"
app/api/github_webhook.py
```

ADD:

```python id="2jlwm3"
logger.info("🪝 GitHub webhook received")

logger.debug(f"📁 Repository: {repository_name}")

logger.debug(f"🌿 Branch: {branch_name}")

logger.debug(f"📦 Commits: {len(commits)}")
```

---

# STEP 7 — ADD SIGNATURE LOGS

Inside verification:

```python id="1jlwm9"
logger.info("🔐 Verifying GitHub signature")
```

Success:

```python id="7jlwm8"
logger.success("✅ GitHub signature valid")
```

Failure:

```python id="6jlwm5"
logger.error("❌ Invalid GitHub signature")
```

---

# STEP 8 — ADD GITHUB API LOGS

Inside GitHub fetch service:

BEFORE request:

```python id="3jlwm8"
logger.info(
    f"🌐 Fetching GitHub commit {commit_sha}"
)
```

AFTER success:

```python id="5jlwm7"
logger.success(
    f"✅ GitHub API success {response.status_code}"
)
```

Failure:

```python id="4jlwm4"
logger.error(
    f"❌ GitHub API failed {response.status_code}"
)
```

---

# STEP 9 — ADD LLM LOGS

Inside summarization:

BEFORE:

```python id="8jlwm4"
logger.info("🧠 Generating AI summary")
```

AFTER:

```python id="9jlwm1"
logger.success("✅ AI summary generated")
```

FAILURE:

```python id="0jlwm3"
logger.exception("❌ AI summarization failed")
```

---

# STEP 10 — ADD EMBEDDING LOGS

BEFORE:

```python id="1jlwm4"
logger.info("📐 Generating embeddings")
```

AFTER:

```python id="2jlwm1"
logger.success("✅ Embeddings generated")
```

FAILURE:

```python id="3jlwm1"
logger.exception("❌ Embedding generation failed")
```

---

# STEP 11 — ADD DB LOGS

Before DB insert:

```python id="4jlwm0"
logger.info("🗄️ Storing commit")
```

After success:

```python id="5jlwm0"
logger.success("✅ Commit stored")
```

Failure:

```python id="6jlwm0"
logger.exception("❌ DB transaction failed")
```

---

# STEP 12 — ADD GLOBAL EXCEPTION HANDLER

CREATE:

```txt id="7jlwm0"
app/core/exception_handlers.py
```

PASTE:

```python id="8jlwm0"
from fastapi import Request
from fastapi.responses import JSONResponse

from app.core.logger import logger


async def global_exception_handler(
    request: Request,
    exc: Exception
):

    logger.exception(
        f"💥 Unhandled exception at {request.url.path}"
    )

    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal Server Error"
        }
    )
```

---

# REGISTER IT

Inside `main.py`:

```python id="9jlwm0"
from app.core.exception_handlers import global_exception_handler

app.add_exception_handler(
    Exception,
    global_exception_handler
)
```

---

# FINAL RESULT

Now AUTOMATICALLY your terminal shows:

```txt id="0jlwm1"
🚀 Logger initialized

📥 POST /api/github/webhook

🪝 GitHub webhook received

🔐 Verifying GitHub signature

✅ GitHub signature valid

🌐 Fetching GitHub commit

🧠 Generating AI summary

📐 Generating embeddings

🗄️ Storing commit

✅ Pipeline completed

📤 200 1821ms
```

WITHOUT:

* startup flags
* manual debug mode
* extra CLI params

PERMANENTLY enabled by architecture.
