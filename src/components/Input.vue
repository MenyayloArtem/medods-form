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
            defaultType : ""

        })
    },

    mounted() {
        // this.defaultType = this.props.type

        // if (this.props.type == "date") {
        //     this.props.type = "text"
        // }
    }
}
</script>

<template>
    <div class="Input">
        <label for="input"
        :class="{warn : warn}"
        v-if="type != 'checkbox'"
        >{{ label }}</label>
        <input 
        class="shadow"
        :placeholder="placeholder"
        :checked="value"
        :style="{
            width : width ? `${width}px` : undefined,
        }"
    
        @input="$emit('input', $event.target.value)"
        :class="{warn : warn}"
        :value="value"
        :type="type || 'text'"
        id="input">

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
    }
</style>

