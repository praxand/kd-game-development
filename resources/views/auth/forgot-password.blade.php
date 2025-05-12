<x-guest-layout>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
            </div>

            <x-auth-session-status class="mb-4" :status="session('status')" />

            <form method="POST" action="{{ route("password.email") }}">
                @csrf

                <div>
                    <x-input-label for="email" value="Email address" />

                    <div class="mt-2">
                        <x-text-input id="email" class="mt-1 block w-full" type="email" name="email" :value="old('email')" required autofocus />
                    </div>

                    <x-input-error :messages="$errors->get('email')" class="mt-2" />
                </div>

                <div class="mt-4 flex items-center justify-end">
                    <x-primary-button>
                        Email Password Reset Link
                    </x-primary-button>
                </div>
            </form>
        </div>
    </div>
</x-guest-layout>
