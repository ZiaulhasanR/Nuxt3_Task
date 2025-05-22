<template>
  <div class=" max-w-[900px] bg-white flex flex-col justify-center item-center">

    <div class="bg-indigo-600 text-white p-4 flex items-center gap-2">
      <span class="font-semibold">BD Funnel Chatbot</span>
    </div>


    <div class="bg-white p-4 flex gap-8 overflow-x-auto border-b justify-center items-center ">
      <div v-for="n in 6" :key="n" class=" flex rounded-md ">
        <img src="/image/image 1.png" alt="Product" class="h-full object-contain w-28 h-28" />
      </div>
    </div>


    <div v-for="(msg, index) in messages" :key="index" :class="msg.sender === 'user' ? 'flex justify-end items-start gap-2' : 'flex items-start gap-2'" class="p-4">

      <div v-if="msg.sender === 'bot'" class="w-8 h-8 rounded-full bg-[#6366f1] flex items-center justify-center text-white font-bold">
        {{ name1[0] }}
      </div>
      <div v-if="msg.sender === 'user'" class="w-8 h-8 rounded-full bg-[#cfd1d4] flex items-center justify-center text-white font-bold order-2">
        {{ name2[0] }}
      </div>


      <div :class="msg.sender === 'user' ? 'bg-indigo-500 text-white order-1' : 'bg-gray-100 text-black'" class="px-4 py-2 rounded-lg max-w-xs shadow text-sm">
        {{ msg.text }}
      </div>
    </div>


    <div class="border-t p-4 flex items-center gap-2">
      <input v-model="newMessage" @keyup.enter="sendMessage" type="text" placeholder="Type your message..."
             class="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none" />
      <button @click="sendMessage" class="bg-indigo-500 text-white p-2 rounded-full">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      </button>
    </div>


  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const newMessage = ref('')
const messages = ref([])


onMounted(() => {
  const stored = localStorage.getItem('chatMessages')
  messages.value = stored ? JSON.parse(stored) : [
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]
})

const name1 = "Alom";
const name2 = "Bablu";

watch(messages, () => {
  localStorage.setItem('chatMessages', JSON.stringify(messages.value))
}, { deep: true })

const sendMessage = () => {
  if (!newMessage.value.trim()) return


  messages.value.push({ sender: 'user', text: newMessage.value })
  console.log("newMessage.value"+newMessage.value.toLowerCase().includes('shubrata'));

  const checkMessage = () => {
    if (newMessage.value.toLowerCase().includes('shubrata')) {
      messages.value.push({ sender: 'bot', text: 'Price for the Subhrata Cream is 1245 BDT' })
    } else {
      messages.value.push({ sender: 'bot', text: 'Hello! How can I help you today?' })
    }
    newMessage.value = ''
  }
  checkMessage();

}
</script>
