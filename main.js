
// Data
var numbers, companies
d3.csv("./numbers.csv").then(result => numbers = result)
d3.csv("./companies.csv").then(result => companies = result)

// Events
let result_info, result_list
function when_document_is_loaded() {
    document.getElementById("number_input").addEventListener("input", check_numbers)
    result_info = document.getElementById("result_info")
    result_list = document.getElementById("results")
    result_list.replaceChildren
}

// Search
function check_numbers(event) {
    if (!event.target.checkValidity()) {
        result_info.textContent = "Número inválido"
        return null
    }
    let query = event.target.value
    let result_data = find_companies(query)
    result_info.textContent = result_data.message
    let results_elements = []
    if (0 < result_data.companies.length && result_data.companies.length < 10) {
        for (var i = 0; i < result_data.companies.length; i++) {
            let element = document.createElement("li")
            element.textContent = result_data.companies[i]
            results_elements.push(element)
        }
    }
    result_list.replaceChildren(...results_elements)
}

function find_companies(query) {
    let matches = numbers.filter( x => match_number(x.number, query))
    let matched_companies = get_companies(matches)
    var message = ""
    if (matched_companies.length > 10) {
        message = "Muchos resultados, realiza una búsqueda más especifica"
    } else if (matched_companies.length == 0) {
        message = "Sin resultados"
    } else if (query.length < 7) {
        message = "La búsqueda requiere al menos 5 números"
    }
    return {query, companies: matched_companies, message}
}

function match_number(n1, n2) {
    let i_max = Math.min(n1.length, n2.length)
    if (i_max == 0) { return false }
    for (var i = 0; i < i_max; i++) {
        if (n1[i] != n2[i] && n1[i] != "X" && n2[i] != "X") {
            return false
        }
    }
    return true
}

function get_companies(numbers) {
    var ids = []
    for (var i = 0; i < numbers.length; i++) {
        if (!ids.includes(numbers[i].company_id)) {
            ids.push(numbers[i].company_id)
        }
    }
    console.log(ids)
    var companies_names = []
    for (var i = 0; i < ids.length; i++) {
        companies_names.push(companies.find(c => c.id == ids[i]).name)
    }
    return companies_names
}


document.addEventListener("DOMContentLoaded", when_document_is_loaded);

