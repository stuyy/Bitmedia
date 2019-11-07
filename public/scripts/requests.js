async function postStatus() {
    let status = document.getElementById('status').value;
    if(status.length !== 0) {
        let statusObj = { status: status }
        try {
            let res = await fetch('/user/post/status', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(statusObj)
            });
            
        }
        catch(err) {
            
        }
    }
    
}