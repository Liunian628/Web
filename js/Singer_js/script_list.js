const table = document.getElementById("table");
const fileUploader = document.querySelector("#myfiles");

fileUploader.setAttribute("hidden", true);

const search = () => {
    const filter = myInput.value.toLowerCase();
    const rows = table.querySelectorAll("tr");
    rows.forEach(row => {
        const nested = row.querySelectorAll("td");
        const [columnA, columnB, columnC] = (nested.length === 3) ? [nested[0].textContent, nested[1].textContent, nested[2].textContent] : ["", "", ""];
								// set search column
        const result = columnA.toLowerCase();
        row.style.display = (result.indexOf(filter) > -1) ? "" : "none";
    });
}

const checkTable = () => {
    const el = document.querySelector("[data-toggle]");
    if (el.hasAttribute("data-active")) {
        el.textContent = "";
        const fragment = document.getElementById("table-reset");
        const instance = document.importNode(fragment.content, true);
        el.appendChild(instance);
    } else el.setAttribute("data-active", true);
}

const pullfiles = function() {
    const fileInput = fileUploader;
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(evt) {
        handleJSON(evt.target.result);
    };
    reader.readAsText(file);
}

function handleJSON(objectArray) {
    checkTable();
    const abbr_enabled = false;
    const sections = JSON.parse(objectArray);
    const fragment = document.getElementById("table-row-template");
    sections.forEach(section => {
        section.items.forEach(item => {
            const instance = document.importNode(fragment.content, true);
            if (item === section.items[0])
                instance.querySelector(".name").classList = "name lead";
            // enable html abbreviation tags
            if (abbr_enabled) {
                instance.querySelector(".abbr").textContent = item.name;
                instance.querySelector(".abbr").title = item.desc;
				instance.querySelector(".abbr").title = item.time;
            } else
                instance.querySelector(".name").textContent = item.name;
                instance.querySelector(".desc").textContent = item.desc;
				instance.querySelector(".time").textContent = item.time;
            table.appendChild(instance);
        });
    });
}

fileUploader.onchange = pullfiles;



/* JSON TEMPLATE
[{
	"name": "section-name",
	"items": [{
		"name": "item-name",
		"desc": "description"
	}]
}]
*/



/* DEFAULT TABLE DATA - (The majority of this data was sourced from https://en.wikipedia.org/w/index.php?title=List_of_computing_and_IT_abbreviations&oldid=907152883) */
handleJSON(`[{"name":"0–9","items":[{"name":"Worderland","desc":"As long as you keep pace with me, miracles will be around","time":"2019.10.14"},{"name":"While i can","desc":"If you open your eyes, you will lose","time":"2020.10.20"},{"name":"Stay with you","desc":"As long as the heart is together, it's not difficult","time":"2020.8.9"},{"name":"Like you do","desc":"I don't know if you love me","time":"2020.10.20"},{"name":"Util the day","desc":"Small actions will bring great effects","time":"2017.11.24"},{"name":"As i believe","desc":"It seems that we met by chance, maybe not by chance","time":"2019.8.26"}]}]`);