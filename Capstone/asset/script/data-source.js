let output = '';
$.each(journal, (i, j) => {
    output += `
        <div class="journal">
        <h2>${j.id}</h2>
        <p><a href="${j.link}">${j.title}</a></p>
        </div>
    `;
    console.log(output);
});

$('#references').html(output);
