window.addEventListener("load", (e) => {
  e.preventDefault();
  getAllPurchases();
});

let offset = 0;
let totalPages = 0;
let offsetHistory = 0;
let totalPagesHistory = 0;

let idPurchaseForHistory = 0;

const backendURL = "http://localhost:3001/api";

const implementPurchasesCard = (data) => {
  const table = new Tabulator("#purchase-cards", {
    height: "100%",
    data,
    layout: "fitColumns",
    columns: [
      { title: "ID", field: "id", width: 50 },
      {
        title: "Presupuesto",
        field: "budget",
        formatter: "money",
        formatterParams: {
          decimal: ",",
          thousand: ".",
          symbol: "$",
          precision: false,
        },
      },
      { title: "Unidad", field: "unity" },
      { title: "Cantidad", field: "amount" },
      { title: "Tipo", field: "typeGoodOrService" },
      {
        title: "Valor total",
        field: "totalValue",
        formatter: "money",
        formatterParams: {
          decimal: ",",
          thousand: ".",
          symbol: "$",
          precision: false,
        },
      },
      {
        title: "Fecha de adquisición",
        field: "purchaseDate",
        formatter: (cell) => {
          return Intl.DateTimeFormat("es-CO", {
            dateStyle: "medium",
            timeZone: "America/Bogota",
          }).format(new Date(cell.getValue()));
        },
      },
      {
        title: "Activado",
        field: "isActive",
        formatter: "tickCross",
        width: 40,
        hozAlign: "center",
      },
      {
        title: "Editar",
        field: "edit",
        formatter: () => {
          return `<svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="edit"> <g> <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon> </g> </g> </g> </g></svg>`;
        },
        width: 40,
        hozAlign: "center",
      },
    ],
  });

  table.on("cellClick", function (_, cell) {
    if (cell.getField() === "isActive") {
      activateOrDeactivatePurchase(cell.getData().id);
    } else if (cell.getField() === "edit") {
      modalFunctionality();
      putInfoInModal(cell.getData(), false);
    } else {
      idPurchaseForHistory = cell.getData().id;
      modalFunctionality(undefined, true);
      putInfoInModal(cell.getData(), true);
      getHistoryByPurchaseId(cell.getData().id);
    }
  });
};

const implementHistoryTable = (data) => {
  const table = new Tabulator("#history-table", {
    height: "100%",
    data,
    layout: "fitColumns",
    columns: [
      { title: "ID", field: "id", width: 50 },
      {
        title: "Presupuesto",
        field: "budget",
        formatter: "money",
        formatterParams: {
          decimal: ",",
          thousand: ".",
          symbol: "$",
          precision: false,
        },
      },
      { title: "Unidad", field: "unity" },
      { title: "Cantidad", field: "amount" },
      { title: "Valor unitario", field: "unitValue" },
      { title: "Tipo", field: "typeGoodOrService" },
      {
        title: "Valor total",
        field: "totalValue",
        formatter: "money",
        formatterParams: {
          decimal: ",",
          thousand: ".",
          symbol: "$",
          precision: false,
        },
      },
      { title: "Proveedor", field: "supplier" },
      { title: "Documentación", field: "documentation" },
      {
        title: "Fecha de adquisición",
        field: "purchaseDate",
        formatter: (cell) => {
          return cell.getValue()
            ? Intl.DateTimeFormat("es-CO", {
                dateStyle: "medium",
                timeZone: "America/Bogota",
              }).format(new Date(cell.getValue()))
            : null;
        },
      },
      {
        title: "Activado",
        field: "isActive",
        formatter: "tickCross",
        width: 40,
        hozAlign: "center",
      },
    ],
  });
};

const purchaseIds = [
  "id",
  "budget",
  "unity",
  "typeGoodOrService",
  "amount",
  "unitValue",
  "totalValue",
  "supplier",
  "purchaseDate",
  "documentation",
  "isActive",
  "createdAt",
  "updatedAt",
];

const putInfoInModal = (data, doDisable) => {
  purchaseIds.forEach((val) => {
    if (val === "id" || document.getElementById(val)) {
      const elementID = document.getElementById(val);
      if (doDisable && val !== "id") {
        elementID.disabled = true;
        document.getElementById("modal-button").style = "display: none";
      } else if (!doDisable && val !== "id") {
        elementID.disabled = false;
        document.getElementById("modal-button").style = "display: block";
      }

      switch (val) {
        case "totalValue":
          elementID.value = data[val];
          elementID.disabled = true;
          break;
        case "purchaseDate":
          elementID.value = new Date(data[val]).toISOString().split("T")[0];
          break;
        case "id":
          document.getElementById(`${val}-title-modal`).innerHTML =
            `Adquisición #${data[val]}`;
          break;
        default:
          elementID.value = data[val];
          break;
      }
    }
  });
};

const modalFunctionality = (isAddPurchase, openPagination) => {
  const modal = document.getElementById("purchase-details-modal");
  const btn = document.getElementById("modal-button");

  if (openPagination) {
    document.getElementById("history-table").style = "display: block;";
    document.getElementById("pagination-history").style = "display: flex;";
  } else {
    document.getElementById("history-table").style = "display: none;";
    document.getElementById("pagination-history").style = "display: none;";
  }

  cleanModal();
  if (isAddPurchase) {
    document.getElementById("id-title-modal").innerHTML = "Añadir adquisición";
    document.getElementById("modal-button").style = "display: block";
    btn.innerText = "Añadir";
  } else {
    btn.innerText = "Actualizar";
  }

  if (modal.classList.contains("hidden")) {
    modal.classList.replace("hidden", "flex");
  } else {
    modal.classList.replace("flex", "hidden");
  }
};

const cleanModal = () => {
  purchaseIds.forEach((val) => {
    if (val === "id" || document.getElementById(val)) {
      const elementID = document.getElementById(val);
      if (val !== "id") {
        elementID.disabled = false;
        switch (val) {
          case "purchaseDate":
            elementID.value = "";
            break;
          case "totalValue":
            elementID.value = "";
            elementID.disabled = true;
            break;
          default:
            elementID.value = "";
            break;
        }
      }
    }
  });
};

const cleanFilters = () => {
  document.getElementById("filter-input").value = "";
  document.getElementById("start-date").value = "";
  document.getElementById("end-date").value = "";
};

const calculateTotalValue = () => {
  const amount = document.getElementById("amount").value;
  const unitValue = document.getElementById("unitValue").value;
  const totalValue = amount * unitValue;

  document.getElementById("totalValue").value = totalValue;
};

const onClickModalBtn = () => {
  const btn = document.getElementById("modal-button");

  if (btn.innerText === "Añadir") {
    savePurchases();
  } else {
    updatePurchase();
  }
  cleanModal();
};

const onClickFilter = () => {
  const filter = document.getElementById("filter-input").value;
  const start = document.getElementById("start-date").value;
  const end = document.getElementById("end-date").value;
  getAllPurchases(filter, start, end);
};

const paginationPurchase = (isNext) => {
  if (isNext !== undefined) {
    isNext ? offset++ : offset--;
    offset = Math.max(offset, 0);
    getAllPurchases();
  }

  document.getElementById("total-pages").innerText = totalPages;
  document.getElementById("showing-first").innerText = offset * 10 + 1;
  document.getElementById("showing-last").innerText = offset * 10 + 10;
};

const paginationHistory = (isNext) => {
  if (isNext !== undefined) {
    isNext ? offsetHistory++ : offsetHistory--;
    offsetHistory = Math.max(offsetHistory, 0);
    getHistoryByPurchaseId(idPurchaseForHistory);
  }

  document.getElementById("total-history-pages").innerText = totalPagesHistory;
  document.getElementById("showing-history-first").innerText =
    offsetHistory * 10 + 1;
  document.getElementById("showing-history-last").innerText =
    offsetHistory * 10 + 10;
};

/* SERVICIOS */
const getAllPurchases = async (value, start, end) => {
  const filter = `filter=${value}`;
  const rangeDate = `start=${start}&end=${end}`;

  const active = document.getElementById("active-purchase-checkbox").checked;

  let query = `?active=${active}&offset=${offset}&`;

  if (value) {
    query += filter;
  }

  if (start && end) {
    query += `&${rangeDate}`;
  }

  try {
    const { data } = await axios.get(`${backendURL}/purchase${query}`);
    implementPurchasesCard(data.data.rows);
    totalPages = data.data.total;
    paginationPurchase(undefined);
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const savePurchases = async () => {
  const data = {
    budget: document.getElementById("budget").value,
    unity: document.getElementById("unity").value,
    typeGoodOrService: document.getElementById("typeGoodOrService").value,
    amount: document.getElementById("amount").value,
    unitValue: document.getElementById("unitValue").value,
    supplier: document.getElementById("supplier").value,
    purchaseDate: document.getElementById("purchaseDate").value,
    documentation: document.getElementById("documentation").value,
  };

  try {
    await axios.post(`${backendURL}/purchase`, data);
    getAllPurchases();
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updatePurchase = async () => {
  const id = document.getElementById("id-title-modal").innerText.split("#")[1];
  const data = {
    budget: document.getElementById("budget").value,
    unity: document.getElementById("unity").value,
    typeGoodOrService: document.getElementById("typeGoodOrService").value,
    amount: document.getElementById("amount").value,
    unitValue: document.getElementById("unitValue").value,
    supplier: document.getElementById("supplier").value,
    purchaseDate: document.getElementById("purchaseDate").value,
    documentation: document.getElementById("documentation").value,
  };

  try {
    await axios.put(`${backendURL}/purchase/${id}`, data);
    getAllPurchases();
  } catch (error) {
    console.log(error);
  }
};

const activateOrDeactivatePurchase = async (id) => {
  try {
    await axios.delete(`${backendURL}/purchase/${id}`);
    getAllPurchases();
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getHistoryByPurchaseId = async (id) => {
  try {
    const { data } = await axios.get(
      `${backendURL}/history/${id}?offset=${offsetHistory}`
    );
    implementHistoryTable(data.data.rows);
    totalPagesHistory = data.data.total;
    paginationHistory(undefined);
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
