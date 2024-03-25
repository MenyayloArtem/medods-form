<script>
export default {
    name : "Input",
    props : {
        label : String,
        placeholder : String,
        width : Number,
        value : String|Boolean,
        type : String,
        warn : String|Boolean
    },

    data() {
        return ({
            // inputType : ""
            wasFocus : false

        })
    },

    computed : {
        inputType () {
            let type = null

            if (this.type == 'date') {
                if (this.wasFocus) {
                    type = 'date'
                } else {
                    type = "text"
                }
            } else {
                type = this.type || "text"
            }

            return type
        }
    }
}
</script>

<template>
    <div class="Input"
    :style="{
            width : width ? `${width}px` : type != 'checkbox' ? '100%' : undefined,
        }"
    >
        <label for="input"
        :class="{warn : warn}"
        v-if="type != 'checkbox'"
        >{{ label }}</label>
        <input 
        class="shadow"
        :placeholder="placeholder || label"
        v-if="type != 'date'"
        :checked="value"
        
        :value="value"
        @input="$emit('input', $event.target.value)"
        @focus="wasFocus = true"
        :class="{warn : warn}"
        
        :type="inputType"
        id="input">

        <div class="input-wrapper" v-else
        :value="value"
        @input="$emit('input', $event.target.value)"
        :class="{warn : warn}"
        >
            <div class="placeholder"
            :class="{hasValue : value}"
            >
            <div class="span">
                {{ value || "Дата" }}
            </div>
                
                <img class="calendar-icon" src="/calendar.svg" width="20" fill="#999"/>
            </div>
            <input type="date" name="" id="">
        </div>

        <div class="warn-message" v-if="warn">
            {{ warn }}
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
    .Input {
        display: flex;
        flex-direction: column;
        position: relative;
        color: var(--gray);

        .input-wrapper {
            position: relative;
            width: 100%;

            input[type='date'] {
                bottom: none;
                position: absolute;
                top: 0;
                left: 0;
                border: none;
                width: 100%;
                height: 100%;
                z-index: 1;
            }

            .placeholder {
            display: flex;
            justify-content: space-between;
                position: absolute;
                pointer-events: none;
                display: flex;
                align-items: center;
                top: 0;
                left: 0;
                padding: 10px 15px;
                width: 100%;
                height: 100%;
                background: #fff;
                color: #999;
                z-index: 2;

                &.hasValue {
                    color: inherit;
                }

                .calendar-icon {
                    opacity: 0.5;
                }
            }
        }
    }

    input[type='date']::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator {
    width: 100%;
}
</style>

