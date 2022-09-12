import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userLogIn = createAsyncThunk(
  'signIn',
  async ({ email, password }) => {
    try {
      console.log('2nd Step:' + email + password);
      const backendRes = await axios.post(
        'http://localhost:8000/api/signin',
        {
          email: email,
          password: password
        }
      );
      return backendRes.data;
    } catch (err) {
      console.error(`Error!: ${err}`);
    }
  }
);

export const userRegister = createAsyncThunk(
  'signUp',
  async ({ email, password, name, password_confirmation }) => {
    try {
      console.log('2nd Step:' + email + password);
      const backendRes = await axios.post(
        'http://localhost:8000/api/signup',
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        }
      )
        .then((res) => {
          console.log(res);
          return res.data;
        });
    } catch (err) {
      alert('Whoops! Something went wrong. Please check email and or password and try again.');
      console.error(`Error!: ${err}`);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    name: '',
    email: '',
    password: '',
    loggedIn: false,
    loading: false,
    error: false
  },
  reducers: {
    setUser(state, { payload }) {
      state.username = payload.username;
      state.name = payload.name;
      state.loggedIn = false;
    },
    setSameUser(state) {
      return { ...state };
    },
    toggleLoggedIn(state) {
      state.loggedIn = !state.loggedIn;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogIn.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
        state.email = payload.message.email;
        state.name = payload.message.name;
        if (payload.token) {
          localStorage.setItem('user', JSON.stringify(payload.token));
        }
      })
      .addCase(userLogIn.rejected, (state) => {
        state.error = true;
      })
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.email = payload.message.email;
        state.name = payload.message.name;
      })
      .addCase(userRegister.rejected, (state) => {
        state.error = true;
      });
  }
});

export const { setUser, setSameUser, toggleLoggedIn } = userSlice.actions;

export default userSlice.reducer;