//input : request, return : response
export default class AuthService {
    constructor(http, tokenStorage) {
        this.http = http;
        this.tokenStorage = tokenStorage;
    }
    async signup(username, password, name, email, url) { //회원가입
        const data = await this.http.fetch('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
                name,
                email,
                url,
            }),
        });
        this.tokenStorage.saveToken(data.token);
        return data;
    }

    async login(username, password) { //로그인
        const data = await this.http.fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
        this.tokenStorage.saveToken(data.token);
        return data;
    }

    async me() {
        const token = this.tokenStorage.getToken();
        return this.http.fetch('auth/me', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async logout() {
        this.tokenStorage.clearToken();
    }

    async logout() {
        return;
    }
}
