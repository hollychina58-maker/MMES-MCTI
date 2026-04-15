import re
with open('D:/projects/MEMS-MCTI/locales/ar/common.json', 'r', encoding='utf-8') as f:
    content = f.read()
    # Find all \0 escapes
    matches = list(re.finditer(r'\\0', content))
    for m in matches:
        print(f'Found at position {m.start()}: {repr(m.group())}')
    print(f'Total: {len(matches)}')