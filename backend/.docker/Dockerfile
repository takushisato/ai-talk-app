ARG PYTHON_VERSION

# ベース作成
FROM python:$PYTHON_VERSION-bullseye as python-base

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    \
    POETRY_VERSION=1.1.5 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_CREATE=false \
    \
    PYSETUP_PATH="/opt/pysetup"

ENV PATH="$POETRY_HOME/bin:$PATH"

# 初期化
FROM python-base as initial
RUN apt update \
  && apt install -y libpq5 libxml2 libmariadb-dev \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip setuptools wheel
RUN pip install poetry
RUN pip install uwsgi

# コンテナ内で仮想環境の作成を無効
RUN poetry config virtualenvs.create false
RUN poetry config virtualenvs.in-project true

FROM initial as development-base
ENV POETRY_NO_INTERACTION=1
COPY poetry.lock pyproject.toml ./


FROM development-base as development
RUN poetry install

WORKDIR /opt/app
#COPY . /opt/app

FROM development-base as builder-base
RUN poetry install --no-dev

# 実行用コンテナ
FROM python:$PYTHON_VERSION-slim-bullseye as production

ARG PYTHON_VERSION

COPY --from=builder-base /usr/local/lib/python$PYTHON_VERSION/site-packages /usr/local/lib/python$PYTHON_VERSION/site-packages
COPY --from=builder-base /usr/local/bin/poetry /usr/local/bin/poetry
COPY --from=builder-base /usr/local/bin/uwsgi /usr/local/bin/uwsgi

RUN useradd -r -s /bin/false uwsgiusr
RUN mkdir -p /opt/app/src/logs/app_logs
RUN touch /opt/app/src/logs/server.log
RUN chown -R uwsgiusr /opt/app/src/logs

USER uwsgiusr

COPY deploy/uwsgi.ini /opt/app
COPY . /opt/app
