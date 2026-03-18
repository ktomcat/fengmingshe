# 修复app.ts文件的编码问题
$content = [System.IO.File]::ReadAllText('miniprogram/app.ts', [System.Text.Encoding]::GetEncoding('GBK'))
[System.IO.File]::WriteAllText('miniprogram/app.ts', $content, [System.Text.Encoding]::UTF8)
Write-Host "编码修复完成！"