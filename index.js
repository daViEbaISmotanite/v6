var body = document.getElementById('body');
var notified = [];

function notifyMe() {
    var data = '', output = '<table class="table table-hover"><tbody><tr class="table-warning">';
    notified.forEach(mace => data += `<tr class="table-warning">
    <th scope="row">${mace}</th>
    <td>е на линия</td>
    <td><a href="https://xhamsterlive.com/${mace}"  target="_blank">тук</a></td>
    </tr>`);
    output += `${data}</tr></tbody></table>`;
    body.innerHTML = output;
}

function handleReuqest(data) {
    if (data && !notified.includes(data)) notified.push(data);
    if (!data && notified.includes(data)) notified.splice(notified.indexOf(data), 1);
    notifyMe();
}

async function checkForMace(mace) {
    const url = `https://stripchat.com/api/external/v4/widget?sortOrder=asc&modelsList=${mace}&strict=1`;
    try {
        const temp = await axios.get(url);
        const data = temp.data.models[0] ? temp.data.models[0] : null;
        data ? handleReuqest(mace) : console.log(`${mace} spi`);
    } catch (err) {
        console.log(`err: ${err}`);
    }
}

function notifier() {
    DB.forEach(mace => {
        checkForMace(mace);
    });

    setTimeout(notifier, "60000");
}

notifier();