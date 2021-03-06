import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Key } from "~/Models";
import { $axios } from "~/utils/nuxt-instance";

interface StorePayload {
  email: string;
  redirectUrl: string;
}

interface UpdatePayload {
  key: string;
  name: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

@Module({ name: "users/register", stateFactory: true, namespaced: true })
export default class Register extends VuexModule {
  private keyInstance = {} as Key;

  public get $key() {
    return this.keyInstance;
  }

  @Mutation
  private UPDATE_KEY(key: Key) {
    this.keyInstance = key;
  }

  @Action
  public async create(payload: StorePayload) {
    try {
      const data = await $axios.$post("/register", payload);

      return data;
    } catch (error: any) {
      return { error: error.response };
    }
  }

  @Action
  public async show(key: string) {
    const data = await $axios.$get(`/register/${key}`);

    this.context.commit("UPDATE_KEY", data);
  }

  @Action
  public async update(payload: UpdatePayload) {
    try {
      const data = await $axios.$put("/register", payload);

      return data;
    } catch (error: any) {
      return { error: error.response };
    }
  }
}
