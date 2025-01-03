# ベースイメージ
ARG PYTHON_VERSION
FROM python:$PYTHON_VERSION-bullseye as python-base

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_CREATE=false \
    PATH="$POETRY_HOME/bin:$PATH"

# ベースセットアップ
RUN apt update && apt install -y libpq5 libxml2 libmariadb-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
RUN pip install --upgrade pip setuptools wheel
RUN pip install "poetry>=1.6.1"
RUN pip install uwsgi

# 開発用ステージ
FROM python-base as development
WORKDIR /opt/app
COPY poetry.lock pyproject.toml ./

# 開発依存関係をインストール
RUN poetry install --with dev

COPY . /opt/app

# ビルドステージ（本番用）
FROM python-base as builder
WORKDIR /opt/app
COPY poetry.lock pyproject.toml ./

# 本番用依存関係のみインストール
RUN poetry install --without dev

# 実行ステージ
FROM python:$PYTHON_VERSION-slim-bullseye as production

# 必要なファイルをビルダーからコピー
COPY --from=builder /usr/local/lib/python${PYTHON_VERSION}/site-packages /usr/local/lib/python${PYTHON_VERSION}/site-packages
COPY --from=builder /usr/local/bin/poetry /usr/local/bin/poetry
COPY --from=builder /usr/local/bin/uwsgi /usr/local/bin/uwsgi

# アプリケーションの準備
WORKDIR /opt/app
COPY . /opt/app

# ログディレクトリの準備
RUN useradd -r -s /bin/false uwsgiusr \
    && mkdir -p /opt/app/src/logs/app_logs \
    && touch /opt/app/src/logs/server.log \
    && chown -R uwsgiusr /opt/app/src/logs

USER uwsgiusr

# uwsgi の設定を指定
COPY deploy/uwsgi.ini /opt/app
CMD ["uwsgi", "--ini", "/opt/app/deploy/uwsgi.ini"]
