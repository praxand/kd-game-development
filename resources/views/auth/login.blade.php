<x-guest-layout>
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
        </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <x-auth-session-status class="mb-4" :status="session('status')" />

            <form class="space-y-6" action="{{ route("login") }}" method="POST">
                @csrf

                <div>
                    <x-input-label for="email" value="Email address" />

                    <div class="mt-2">
                        <x-text-input id="email" class="block w-full" type="email" name="email" :value="old('email')" required autofocus autocomplete="username" />
                    </div>

                    <x-input-error :messages="$errors->get('email')" class="mt-2" />
                </div>

                <div>
                    <x-input-label for="password" value="Password" />

                    <div class="mt-2">
                        <x-text-input id="password" class="block w-full" type="password" name="password" required autocomplete="current-password" />
                    </div>

                    <x-input-error :messages="$errors->get('password')" class="mt-2" />
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex gap-3">
                        <div class="flex h-6 shrink-0 items-center">
                            <div class="group grid size-4 grid-cols-1">
                                <input id="remember_me" name="remember_me" type="checkbox" class="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-blue-600 checked:bg-blue-600 indeterminate:border-blue-600 indeterminate:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto">

                                <svg class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
                                    <path class="opacity-0 group-has-[:checked]:opacity-100" d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path class="opacity-0 group-has-[:indeterminate]:opacity-100" d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div>

                        <label for="remember_me" class="block text-sm/6 text-gray-900">
                            Remember me
                        </label>
                    </div>

                    @if (Route::has("password.request"))
                        <div class="text-sm/6">
                            <a href="{{ route("password.request") }}" class="font-semibold text-blue-600 hover:text-blue-500">
                                Forgot password?
                            </a>
                        </div>
                    @endif
                </div>

                <div>
                    <x-primary-button>
                        Sign in
                    </x-primary-button>
                </div>
            </form>
        </div>

        <p class="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?

            <a href="{{ route("register") }}" class="font-semibold text-blue-600 hover:text-blue-500">
                Register
            </a>
        </p>
    </div>
</x-guest-layout>
