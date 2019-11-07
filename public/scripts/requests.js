async function postStatus() {
    let status = document.getElementById('status');
    if(status.value.length !== 0) {
        let statusObj = { status: status.value }
        try {
            let res = await fetch('/user/post/status', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(statusObj)
            });
            let alert = generateBootstrapAlert('success', 'Status Updated!');
            status.value = '';
        }
        catch(err) {
            console.log(err);
        }
    }
    
}