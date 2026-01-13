const AuthService = {
    async login(account, password) {
        try {
            const users = await trickleListObjects('user', 100, true);
            const user = users.items.find(u => 
                (u.objectData.phone === account || u.objectData.email === account) && 
                u.objectData.password === password
            );
            
            if (user) {
                localStorage.setItem('jecUser', JSON.stringify(user.objectData));
                return user.objectData;
            } else {
                throw new Error('User does not exist or password is incorrect');
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    },

    async register(name, phone, email, password) {
        try {
            const users = await trickleListObjects('user', 100, true);
            const existingUser = users.items.find(u => 
                u.objectData.phone === phone || 
                (email && u.objectData.email === email)
            );
            
            if (existingUser) {
                if (existingUser.objectData.phone === phone) {
                    throw new Error('Phone number already registered');
                }
                if (email && existingUser.objectData.email === email) {
                    throw new Error('Email already registered');
                }
            }

            const userData = {
                name,
                phone,
                email: email || '',
                password,
                registeredAt: new Date().toISOString()
            };

            const newUser = await trickleCreateObject('user', userData);
            localStorage.setItem('jecUser', JSON.stringify(userData));
            return userData;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    },

    getCurrentUser() {
        const userStr = localStorage.getItem('jecUser');
        return userStr ? JSON.parse(userStr) : null;
    },

    logout() {
        localStorage.removeItem('jecUser');
    }
};
