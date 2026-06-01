#!/bin/sh
# Runtime injection of NEXT_PUBLIC_* values.
#
# NEXT_PUBLIC_* vars are inlined into the compiled bundle at `next build` time,
# so they normally can't be changed without rebuilding. To make them
# overridable at container start, the image is built with a unique placeholder
# URL baked in (see Dockerfile), and this script rewrites that placeholder to
# the real value from the environment before the server boots.
set -e

# var name -> placeholder baked at build time
inject() {
  var="$1"; placeholder="$2"
  eval "value=\${$var:-}"
  [ -n "$value" ] || return 0
  echo "[entrypoint] injecting $var=$value"
  for dir in .next public; do
    [ -d "$dir" ] || continue
    find "$dir" -type f \( -name '*.js' -o -name '*.json' -o -name '*.html' \) \
      -exec sed -i "s|$placeholder|$value|g" {} +
  done
}

inject NEXT_PUBLIC_API_URL "https://runtime-api-url.invalid"

exec "$@"
