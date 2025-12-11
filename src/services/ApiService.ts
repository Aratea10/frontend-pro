export class ApiService {

    // Una función estática NO requiere una instáncia de clase
    public static get<T>(url: string): Promise<T> {
        return fetch(url)
            .then(res => res.json())
            .then(res => res as T)
    }

}