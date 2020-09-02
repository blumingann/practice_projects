const app = new Vue({
    el: '#app',
    data: {
        autos: [],
        rates: [],
        years: [],
        brands: [],
        models: [],
        status: [],
        currency: "USD",
    },
    methods: {
        formatPrice(value) {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    }
});

$.ajax({
    method: 'GET',
    url: 'https://ha.edu.uy/api/cars',
    dataType: "json",
    success: (info) => {
        console.log(info)
        app.autos = info;
        app.years = [...new Set(info.map((auto) => {
            return auto.year;
        }))]
        app.brands = [...new Set(info.map((auto) => {
            return auto.brand;
        }))]
        app.models = [...new Set(info.map((auto) => {
            return auto.model;
        }))]
    },
    error: (xhr, status, e) => {
        alert(e);
    },
});


$.ajax({
    method: 'GET',
    url: 'https://ha.edu.uy/api/rates',
    dataType: "json",
    success: (info) => {
        console.log(info)
        app.rates = info;
    },
});

$("#select-brand").on("change", () => {

    var url = "https://ha.edu.uy/api/models?brand=" + app.brandSelected;

    $.ajax({
        url: url,
        success: (data) => {
            app.models = data;
            app.modelSelected = "";
        }
    });

});

$("#btnChangeRate").on("click", () => {
    if (app.currency == "USD") {
        app.currency = "UYU";
    } else {
        app.currency = "USD";
    }
});

$("#btn-filter").on("click", () => {
    searchCar();
});

function searchCar() {
    app.filtering = true;

    let year = app.yearSelected;
    let brand = app.brandSelected;
    let model = app.modelSelected;
    let status = app.statusSelected;

    $.ajax({
        url: "https://ha.edu.uy/api/cars?year=" + year + "&brand=" + brand + "&model=" + model + "&status=" + status,
        success: (data) => {
            app.filtering = false;
            app.autos = data;
            $(".alert-warning").removeClass('hidden');
        }
    }); // End - Ajax de Autos
}

// Carga inicial de autos:
searchCar(); 
