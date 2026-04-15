import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('D:/projects/MEMS-MCTI/locales/ar/common.json', 'r', encoding='utf-8') as f:
    content = f.read()

# Position 12732
idx = 12732
print(f'Content around 12732:')
for i in range(idx - 30, idx + 50):
    c = content[i]
    print(f'  {i}: {repr(c)}')