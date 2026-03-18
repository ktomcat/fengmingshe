#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import codecs

# 读取文件内容（使用GBK编码读取，因为乱码是UTF-8被错误地解码为GBK导致的）
with open('miniprogram/app.ts', 'rb') as f:
    content = f.read()

# 先尝试用GBK解码，然后用UTF-8重新编码
content_gbk = content.decode('gbk', errors='ignore')

# 用UTF-8编码写回文件
with open('miniprogram/app.ts', 'w', encoding='utf-8') as f:
    f.write(content_gbk)

print("编码修复完成！")