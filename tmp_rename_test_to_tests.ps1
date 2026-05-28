$ErrorActionPreference = 'Stop'

$startBranch = (git branch --show-current).Trim()
if ($startBranch -notmatch '^Milestone(\d+)-') {
  throw "Current branch '$startBranch' is not a milestone branch."
}
$startNum = [int]$Matches[1]

$targets = git branch --format='%(refname:short)' |
  ForEach-Object { $_.Trim() } |
  Where-Object {
    $_ -match '^Milestone(\d+)-' -and ([int]$Matches[1] -ge $startNum)
  } |
  Sort-Object { [int]([regex]::Match($_, '^Milestone(\d+)-').Groups[1].Value) }

$updated = New-Object System.Collections.Generic.List[string]
$skipped = New-Object System.Collections.Generic.List[string]
$failed = New-Object System.Collections.Generic.List[string]

try {
  foreach ($branch in $targets) {
    git checkout $branch | Out-Null

    $hasTest = git ls-tree -d --name-only HEAD -- test
    $hasTests = git ls-tree -d --name-only HEAD -- tests

    if ([string]::IsNullOrWhiteSpace($hasTest)) {
      $skipped.Add($branch + ' (no test folder)')
      continue
    }

    if (-not [string]::IsNullOrWhiteSpace($hasTests)) {
      $skipped.Add($branch + ' (tests already exists)')
      continue
    }

    git mv test tests
    git add -A
    git diff --cached --quiet
    if ($LASTEXITCODE -ne 0) {
      git commit -m 'Rename test folder to tests' | Out-Null
      $updated.Add($branch)
    }
    else {
      $skipped.Add($branch + ' (no changes)')
    }
  }
}
catch {
  $failed.Add("$branch ($($_.Exception.Message))")
  throw
}
finally {
  git checkout $startBranch | Out-Null
}

Write-Output ('Updated branches: ' + ($updated -join ', '))
Write-Output ('Skipped branches: ' + ($skipped -join ', '))
Write-Output ('Failed branches: ' + ($failed -join ', '))
Write-Output ('Returned to branch: ' + $startBranch)
