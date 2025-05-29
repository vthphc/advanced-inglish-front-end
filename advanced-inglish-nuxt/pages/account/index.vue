<script setup lang="ts">
import PremiumDetails from "~/components/account/PremiumDetails.vue";
import AccountManagement from "~/components/account/AccountManagement.vue";
import SubscriptionManagement from "~/components/account/SubscriptionManagement.vue";
import AccountSecurity from "~/components/account/AccountSecurity.vue";
</script>

<template>
    <div class="flex flex-col gap-y-4">
        <PremiumDetails />
        <AccountManagement />
        <SubscriptionManagement />
        <AccountSecurity />
    </div>
</template>
