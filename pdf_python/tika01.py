# coding:UTF-8
#!/usr/bin/env python
import tika
tika.initVM()
from tika import parser

print'PDF名を入力'
pdf = raw_input()
parsed = parser.from_file(str(pdf)+'.pdf')
try:
    result = parsed['metadata']['title']
except KeyError:
    print 'タイトルを取得できませんでした。'
else:
    print result
