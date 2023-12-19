import { rtpBiggestObject, rtpIsListObjects, rtpMinusArray, rtpUpperFirstChar } from "./_utils.js";

const styles =`.rtp-table {
  border-collapse: collapse;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  font-family: Arial, sans-serif;
}

.rtp-table__header {
  color: var(--c-font);
  background-color: var(--c-i-c);
}

.rtp-table__th {
  padding: 10px 15px;
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
}

.rtp-table__body tr {
  background-color: var(--c-i-a);
}

.rtp-table__body tr:nth-child(odd) {
  background-color: var(--c-i-b);
}

.rtp-table__row {
  transition: background-color 0.3s ease;
}

.rtp-table__row:hover {
  background-color: #eef4ff;
}

.rtp-table__cel {
  padding: 8px 15px;
  border-bottom: 1px solid #ddd;
}

.rtp-table__strong {
  font-weight: bold;
}

.rtp-table__imge {
  max-height: 50px; /* Adjust based on your needs */
  max-width: 100px; /* Adjust based on your needs */
  display: block;
  margin: 0 auto;
}
`

export default class RtpTable extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    //styles
    this.myStyles = document.createElement('style');
    this.myStyles.innerHTML = styles;
    
    //elements
    this.table = document.createElement("table");
    this.headerTb = document.createElement("thead");
    this.bodyTb = document.createElement("tbody");

    //clases
    this.table.className    = 'rtp-table'
    this.headerTb.className = 'rtp-table__header'
    this.bodyTb.className   = 'rtp-table__body'
    
    //estructure table
    this.table.appendChild(this.headerTb);
    this.table.appendChild(this.bodyTb);
    this.shadow.appendChild(this.myStyles);
    this.shadow.appendChild(this.table);
  }
  connectedCallback() {
    //attributes
    let url = this.getAttribute("data-url");
    let imageKeys = this.getAttribute("image-keys");
    let strongKeys = this.getAttribute("strong-keys");
    let dropKeys = this.getAttribute("drop-keys");
    let sepKeys = this.getAttribute("separator-keys")||';';
    
    imageKeys   = imageKeys !== null ? imageKeys.split(sepKeys) : null;
    strongKeys  = strongKeys !== null ? strongKeys.split(sepKeys) : null;
    dropKeys    = dropKeys !== null ? dropKeys.split(sepKeys) : null;

    //espesific functions
    const srtStrong = (str) => `<strong class="rtp-table__strong" >${str}</strong>`;
    const toImg = (str) => `<img class="rtp-table__imge" loading="lazy" src="${str}" alt="Table image"/>`;
    
    

    //setData
    const setToTable = (data) =>{
      let objectKeys = Object.keys(rtpBiggestObject(data));
      if(dropKeys) objectKeys = rtpMinusArray(objectKeys,dropKeys)
      
      //header
      const rowHeader = document.createElement("tr");
      rowHeader.className = 'rtp-table__row-header'
      objectKeys.forEach((key) => {
        let th = document.createElement("th");
        th.className = 'rtp-table__th'
        th.innerHTML = rtpUpperFirstChar(key);
        rowHeader.appendChild(th);
      });

      this.headerTb.appendChild(rowHeader)
      
      //body
      data.forEach((element) => {
        const row = document.createElement("tr");
        objectKeys.forEach((key) => {
          let td = document.createElement("td");
          td.classList.add('rtp-table__cel')
          //if we have images
          if (imageKeys) {
            if (imageKeys.includes(key)) {
              td.innerHTML = toImg(element[key] || "");
              row.appendChild(td);
              return;
            }
          }
          //if we have strongs
          if (strongKeys) {
            if (strongKeys.includes(key)) {
              td.innerHTML = srtStrong(element[key] || "");
              row.appendChild(td);
              return;
            }
          }
          td.innerHTML = element[key] || "";
          td.classList.add('rtp-table__cel')
          row.appendChild(td);
        });
        this.bodyTb.appendChild(row);
      });
    }
    
    //getData
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!rtpIsListObjects(data)) {
          this.shadowRoot.innerHTML = srtStrong(
            "The URL does not have a list of objects"
          );
          return;
        }
        setToTable(data)
      });
  }
}

customElements.define("rtp-table", RtpTable)