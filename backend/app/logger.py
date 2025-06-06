import logging
import os
import sys
from dotenv import load_dotenv

load_dotenv()

def setup_logger(name: str) -> logging.Logger:
    logger = logging.getLogger(name)
    try:
        log_level = os.getenv("LOG_LEVEL", "DEBUG").upper()
        level = getattr(logging, log_level, logging.INFO)
        logger.setLevel(level)

        handler = logging.StreamHandler(sys.stdout)
        formatter = logging.Formatter(
            "[%(asctime)s] [%(levelname)s] [%(name)s]: %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )
        handler.setFormatter(formatter)

        if not any(isinstance(h, logging.StreamHandler) for h in logger.handlers):
            logger.addHandler(handler)

        logger.debug(f"Logger '{name}' initialized with level '{log_level}'")
    except Exception as e:
        logger.error(f"Failed to setup logger '{name}': {e}", exc_info=True)
    return logger
