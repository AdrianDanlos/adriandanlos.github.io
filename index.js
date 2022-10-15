fetch("/test", {
    method: "POST",
    headers: {
        "Contant-Type": "application/json",
    },
    body: JSON.stringify({
        name: "Kyle",
    })
}).then(res => res.json()).then(data => console.log(data))


console.log("a")