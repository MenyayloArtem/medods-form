<template>
<div class="Select">
    <label
    :class="{warn : warn}"
    >{{ label }}</label>
    <div class="input-wrapper shadow"
    @click="isOpen = !isOpen"
    :class="{warn : warn}"
    >
        {{ 
            multiple ?
                values.length ?
                    values.join(', '):
                    placeholder
            : value ?
                value :
                placeholder || label
        }}
        <img src="/dropdown.svg" width="12" height="12"/>
        <div class="Select__options"
        v-if="isOpen"
        >
            <div class="select-options__option"
            v-for="option in options"
            :key="option"
            @click="select(option)"
            >
                {{ option }}
            </div>
        </div>
    </div>

    <div class="warn-message" v-if="warn">
        {{ warn }}
    </div>
</div>


</template>

<script>
export default {
    name : "Select",
    data() {
        return ({
            isOpen : false,
            values : []
        })
    },
    props : {
        options : Array,
        label : String,
        value : String|Array,
        placeholder : String,
        multiple : Boolean,
        warn : String|Boolean
    },

    methods : {
        select (option) {
            if (this.multiple) {
                if (!this.value.includes(option)) {
                    this.values.push(option)
                    this.$emit('input', this.values)
                }
            } else {
                this.$emit('input', option)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
// @import "../style.scss";
    .Select {
        display: flex;
        flex-direction: column;
        position: relative;

        &__options {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 5px 15px;
            width: 80%;
            border: 1px solid #bdbdbd;
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 1;
            height: auto;
            background: #fff;
        }

       .input-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: auto;
        background: #fff;
       }

       .select-options__option {
        width: 100%;
        padding: 5px 0;
       }
    }
</style>