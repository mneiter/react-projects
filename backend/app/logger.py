import logging
import os
import sys
from dotenv import load_dotenv

load_dotenv()

def setup_logger(name: str) -> logging.Logger:
    logger = logging.getLogger(name)

    # Получаем уровень логирования из переменной окружения
    log_level = os.getenv("LOG_LEVEL", "DEBUG").upper()
    level = getattr(logging, log_level, logging.INFO)
    logger.setLevel(level)

    handler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter(
        '[%(asctime)s] [%(levelname)s] [%(name)s]: %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    handler.setFormatter(formatter)

    if not any(isinstance(h, logging.StreamHandler) for h in logger.handlers):
        logger.addHandler(handler)

    return logger
