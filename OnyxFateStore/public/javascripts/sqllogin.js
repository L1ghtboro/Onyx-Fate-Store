function collectData(calledFrom) {
    let User = [document.getElementById('collectLOGIN').value,
                document.getElementById('collectEMAIL').value,
                document.getElementById('collectPASS').value,
                document.getElementById('collectNAME').value,
                document.getElementById('collectLASTNAME').value];
 
}

function anchorSubmit(calledForm) {
    document.getElementById(calledForm).submit();
}
