$html = Get-Content index.html -Raw
$html = $html -replace 'required></textarea>', '></textarea>'
$html = $html -replace '<label for="f-pesan">Ucapan &amp; Doa</label>', '<label for="f-pesan">Ucapan &amp; Doa (Pilihan)</label>'
$html | Set-Content index.html -NoNewline

$js = Get-Content script.js -Raw
$js = [System.Text.RegularExpressions.Regex]::Replace($js, '(?m)^\s*if \(\!pesan\).*?return; \}\s*\n', '')
$js | Set-Content script.js -NoNewline
