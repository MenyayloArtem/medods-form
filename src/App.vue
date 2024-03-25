<script>
import Input from './components/Input.vue';
import Select from './components/Select.vue';
import { minLength, helpers, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import {required$, phoneNumber$} from "./validators"


export default {
  components : {Input, Select},
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return ({
          step : 0,
          steps : ["personalData", "address", "passport"],
          documentTypes : ["Паспорт","Свидетельство о рождении","Вод. удостоверение"],
          titleEnum : {
          personalData : "Личные данные",
          address : "Адрес",
          passport : "Паспорт"
        },

        personalData : {
          name : "",
          surname : "",
          fathername : "",
          birthdate : null,
          phone : null,
          clientGroup : [],
          doctor : "",
          noMessage : true
        },

        address : {
          index : "",
          country : "",
          region : "",
          city : "",
          street : "",
          homeNumber : ""
        },

        passport : {
          documentType : "",
          number : "",
          series : "",
          issuedBy : "",
          issueDate : ""
        }
    })
  },

  validations : {
    personalData : {
      name : {required$},
      surname : {required$},
      birthdate : {required$},
      phone : {
        phoneNumber$ : phoneNumber$()
      },
      clientGroup : {required$}
    },

    address : {
      city : {required$}
    },

    passport : {
      documentType : {required$},
      issueDate : {required$}
    }
  },

  methods : {
    goPrev () {
      if (this.step > 0) {
        this.step--
      }
    },
    goNext () {
      const currentForm = this.v$[this.steps[this.step]]
      currentForm.$touch()
      if (!currentForm.$error && this.step < 2) {
        this.step++
      }
    },

    ready () {
      this.v$.$touch()

      if (!this.v$.$error) {
        alert("Новый клиент создан")
      }
    }
  }
}
</script>

<template>
  <div class="app">
    <form class="form shadow"
    @submit.prevent="ready()"
    >
      <div class="form__top shadow">
        <h2>MEDODS</h2>
      </div>
      <div class="form__body">
        <div class="form-group">
          <div class="form-group__subtitle">
              {{ titleEnum[steps[step]] }}
          </div>
          <div class="form-group__body"
          v-if="step == 0"
          >
          
              <Input 
              :label="'Имя'"
              v-model.trim="v$.personalData.name.$model"
              :warn="v$.personalData.name.$error ? v$.personalData.name.required$.$message : false"
              />

              <Input 
              :label="'Фамилия'"
              v-model.trim="v$.personalData.surname.$model"
              :warn="v$.personalData.surname.$error ? v$.personalData.surname.required$.$message : false"
              />

              <Input 
              :label="'Отчество'"
              v-model="personalData.fathername"
              />

              <div class="row">
                <Input 
                :label="'Дата рождения'"
                :type="'date'"
                v-model.trim="v$.personalData.birthdate.$model"
                :warn="v$.personalData.birthdate.$error ? v$.personalData.birthdate.required$.$message : false"
                />

                <Input 
                :label="'Пол'"
                :placeholder="'М/Ж'"
                v-model="personalData.state"
                :width="100"
                />
              </div>
              
              <Select 
              multiple
              :label="'Группа клиентов'"
              :options="['VIP', 'Проблемные', 'ОМС']"
              :placeholder="'Выберите группу'"
              v-model="personalData.clientGroup"
              :warn="v$.personalData.clientGroup.$error ? v$.personalData.clientGroup.required$.$message : false"
              />

              <Input 
              :label="'Номер телефона'"
              :type="'number'"
              :placeholder="'7 123 456 78 90'"
              v-model.trim="v$.personalData.phone.$model"
              :warn="v$.personalData.phone.$error ? v$.personalData.phone.phoneNumber$.$message : false"
              />

              <Input 
              :label="'Лечащий врач'"
              v-model.trim="personalData.doctor"
              />
              <div class="checkbox-wrapper">
                <div class="row">
                  <Input :type="'checkbox'" v-model="personalData.noMessage"/>Не отправлять сообщения
                </div>
              </div>
          </div>

          <div class="form-group__body"
          v-if="step == 1"
          >
            <Input 
            :label="'Индекс'"
            v-model="address.index"
            />
            <Input 
            :label="'Страна'"
            v-model="address.country"
            />
            <Input 
            :label="'Область'"
            v-model="address.region"
            />
            <Input 
            :label="'Город'"
            v-model="v$.address.city.$model"
            :warn="v$.address.city.$error ? v$.address.city.required$.$message : false"
            />
            <Input 
            :label="'Улица'"
            v-model="address.street"
            />
            <Input 
            :label="'Дом'"
            v-model="address.homeNumber"
            />
          </div>

          <div class="form-group__body"
          v-if="step == 2"
          >
            <Select 
            :label="'Тип документа'"
            :options="documentTypes"
            v-model="v$.passport.documentType.$model"
            :warn="v$.passport.documentType.$error ? v$.passport.documentType.required$.$message : false"
            />
            <Input 
            :label="'Серия'"
            v-model="passport.series"
            />
            <Input 
            :label="'Номер'"
            v-model="passport.number"
            />
            <Input 
            :label="'Кем выдан'"
            v-model="passport.issuedBy"
            />

            <Input 
            :label="'Дата выдачи'"
            :type="'date'"
            v-model="v$.passport.issueDate.$model"
            :warn="v$.passport.issueDate.$error ? v$.passport.issueDate.required$.$message : false"
            />
          </div>
        </div>

       
      </div>
      <div class="form__bottom">
        <button
        class="form-button shadow"
        @click.prevent="goPrev()"
        :disabled="step == 0"
        >
          Назад
        </button>
        <div>
          
        </div>
        <button
        class="form-button shadow"
        @click.prevent="goNext()"
        v-if="step < 2"
        >
          Далее
        </button>
        <button v-if="step == 2"
        class="form-button shadow"
        type="submit"

        >
          Отправить
        </button>
      </div>
    </form>
  </div>
</template>
