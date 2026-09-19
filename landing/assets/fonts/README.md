# 강조용 손글씨 서체 — 온글잎 오케이티콘

랜딩 페이지의 차별점 카드와 인용구에 쓰는 서체입니다.
외부 CDN 대신 **자체 호스팅**하며, 페이지에 실제로 쓰이는 글자만 담아 용량을 줄였습니다.

| 파일 | 굵기 | 쓰이는 곳 |
| --- | --- | --- |
| `okticon-bold.woff2` | 700 | 차별점 카드 제목, 강사 인용구, 소개 페이지 인용구 |
| `okticon-regular.woff2` | 400 | 차별점 카드 설명 문단 |

각 110KB 내외이며 `font-display: swap`으로 불러오므로, 서체가 늦게 와도 글자는 바로 보입니다.

## 문구를 바꾼 뒤에는 서브셋을 다시 만들어야 합니다

현재 파일에는 **두 페이지에 등장하는 글자만** 들어 있습니다.
새로운 글자가 들어간 문구로 바꾸면 그 글자만 다른 서체로 보일 수 있습니다.
그럴 때는 원본 TTF(온글잎 오케이티콘 Regular / Bold)를 준비해 아래를 실행하세요.

```bash
pip install fonttools brotli

# 1) 두 페이지에 쓰인 글자를 모은다
python3 - <<'EOF' > /tmp/chars.txt
import re
text = ""
for f in ("index.html", "teacher.html"):
    html = open(f, encoding="utf-8").read()
    html = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", html, flags=re.S)
    text += re.sub(r"<[^>]+>", " ", html)
extra = ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
         " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~·—–…‘’“”「」『』《》※→")
print("".join(sorted(set(text + extra) - set("\n\r\t"))))
EOF

# 2) 서브셋 + woff2 변환
pyftsubset 원본_regular.ttf --text-file=/tmp/chars.txt --layout-features='*' \
  --flavor=woff2 --output-file=assets/fonts/okticon-regular.woff2
pyftsubset 원본_bold.ttf --text-file=/tmp/chars.txt --layout-features='*' \
  --flavor=woff2 --output-file=assets/fonts/okticon-bold.woff2
```

전체 글자를 담으면 굵기당 약 860KB가 되므로, 서브셋 방식을 유지하는 편이 좋습니다.

## 서체에 없는 글자

원본 서체에 가운뎃점(`·`), 엔대시(`–`), 말줄임표(`…`)가 없습니다.
해당 글자만 기본 서체로 표시되므로, 완전히 통일하려면 문구에서
`·` → `,` 또는 `/`, `–` → `-` 로 바꾸면 됩니다.

## 출처와 라이선스

- 서체: **온글잎 오케이티콘** (Light / Regular / Bold)
- 배포처: https://www.okticon.com/freefont/?q=YToxOntzOjEyOiJrZXl3b3JkX3R5cGUiO3M6MzoiYWxsIjt9&bmode=view&idx=169962155&t=board

이 저장소에는 배포처에서 받은 TTF 중 Regular · Bold 를 **웹용 woff2 로 변환하고 서브셋한 파일**만 들어 있습니다.
상용 서비스 적용 전에 배포처 약관에서 아래 두 가지를 확인해 주세요.

1. **웹폰트 임베딩**(서버에 올려 웹사이트에서 사용) 허용 여부
2. **포맷 변환 · 서브셋** 허용 여부 (woff2 변환과 글자 추리기가 '변형'에 해당하는지)

허용되지 않는다면 기존 서체(Pretendard)로 되돌리거나, 웹폰트 사용이 명시적으로 허용된
다른 손글씨 서체로 교체하면 됩니다.

원본 TTF 파일은 저장소에 포함하지 않았으므로, 재생성을 위해 별도로 보관해 주세요.
