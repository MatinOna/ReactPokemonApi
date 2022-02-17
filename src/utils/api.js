export default function getData(url) {
    return fetch(url)
        .then(resp => {
            if (!resp.ok) {
                throw Error("Ocurrio un problema al obtener los Pokemones");
            }
            return resp.json();
        });
}

export function deleteItem (url) {
    return fetch(
        url,
        {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        }
    ).then(r => {
        if (!r.ok) {
            throw new Error("Ocurrio un problema al eliminar el Pokemon");
        }
        return r.json();
    });
}

export function createItem (url, item) {
    return fetch(
        url,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(item)
        }
    ).then(r => {
        if (!r.ok) {
            throw new Error("Ocurrio un problema al crear el Pokemon");
        }
        return r.json();
    });
}

export function editItem (url, item) {
    return fetch(
        url,
        {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(item)
        }
    ).then(r => {
        if (!r.ok) {
            throw new Error("Ocurrio un problema al editar un Pokemon");
        }
        return r.json();
    });
}

