# Rebuilds the two merged stylesheets from their sources.
#   .\build-css.ps1
# Keep the per-library source files in assets/css/ as the files you edit;
# never edit assets/css/vendor.css or assets/css/site.css by hand.

$ErrorActionPreference = 'Stop'
$src = Join-Path $PSScriptRoot 'assets\css'

# Order matters: it is the original <link> order from the HTML pages,
# so the cascade resolves exactly as it did before the merge.
$vendor = @(
    'bootstrap.min.css',
    'animate.css',
    'slick.css',
    'nice-select.css',
    'flaticon.css',
    'swiper-bundle.css',
    'meanmenu.css',
    'font-awesome-pro.css',
    'magnific-popup.css'
)

$site = @(
    'custom-animation.css',
    'spacing.css',
    'style.css'
)

function Join-Sources {
    param([string[]]$Names)

    $charset = $null
    $imports = New-Object System.Collections.Generic.List[string]
    $body = New-Object System.Text.StringBuilder

    foreach ($name in $Names) {
        $path = Join-Path $src $name
        if (-not (Test-Path -LiteralPath $path)) { throw "Missing source: $path" }
        $text = [System.IO.File]::ReadAllText($path)

        # @charset is only honoured as the very first bytes of a stylesheet, and
        # only one is allowed. Catch a leading one (bootstrap has '@charset "UTF-8";/*!'
        # on one line) as well as a standalone one, so neither survives invalid.
        if ($text.IndexOf('@charset') -ge 0) {
            $lead = [regex]::Match($text, '^\uFEFF?@charset[ \t]+["''][^"'']*["''][ \t]*;')
            if ($lead.Success) {
                if ($null -eq $charset) { $charset = $lead.Value -replace '^\uFEFF', '' }
                $text = $text.Remove($lead.Index, $lead.Length)
            }
            $text = [regex]::Replace($text, '(?m)^[ \t]*@charset[ \t]+["''][^"'']*["''][ \t]*;[ \t]*\r?\n', {
                param($m)
                if ($null -eq $charset) { $charset = $m.Value.Trim() }
                ''
            })
        }

        # @import must precede every style rule, so lift them out and re-emit
        # them above everything else. Match the whole line: a URL may contain
        # semicolons (Google Fonts uses 'ital@0;1'), so never stop at the first.
        if ($text.IndexOf('@import') -ge 0) {
            $text = [regex]::Replace($text, '(?m)^[ \t]*@import\b[^\r\n]*\r?\n', {
                param($m)
                $imports.Add($m.Value.Trim())
                ''
            })
        }

        [void]$body.AppendLine("/* ===================== $name ===================== */")
        [void]$body.AppendLine($text.Trim())
        [void]$body.AppendLine()
    }

    $out = New-Object System.Text.StringBuilder
    if ($charset) { [void]$out.AppendLine($charset) }
    foreach ($i in $imports) { [void]$out.AppendLine($i) }
    if ($imports.Count) { [void]$out.AppendLine() }
    [void]$out.Append($body.ToString())
    return $out.ToString()
}

$utf8 = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText((Join-Path $src 'vendor.css'), (Join-Sources $vendor), $utf8)
[System.IO.File]::WriteAllText((Join-Path $src 'site.css'),   (Join-Sources $site),   $utf8)

'Rebuilt assets/css/vendor.css and assets/css/site.css'
