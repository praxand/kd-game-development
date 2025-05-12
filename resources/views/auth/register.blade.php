<x-guest-layout>
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
        </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form class="space-y-6" action="{{ route("register") }}" method="POST">
                @csrf

                <div>
                    <x-input-label for="name" value="Name" />

                    <div class="mt-2">
                        <x-text-input id="name" class="block w-full" type="text" name="name" :value="old('name')" required autofocus autocomplete="name" />
                    </div>

                    <x-input-error :messages="$errors->get('name')" class="mt-2" />
                </div>

                <div>
                    <x-input-label for="email" value="Email address" />

                    <div class="mt-2">
                        <x-text-input id="email" class="block w-full" type="email" name="email" :value="old('email')" required autocomplete="email" />
                    </div>

                    <x-input-error :messages="$errors->get('email')" class="mt-2" />
                </div>

                <div>
                    <x-input-label for="password" value="Password" />

                    <div class="mt-2">
                        <x-text-input id="password" class="block w-full" type="password" name="password" required autocomplete="new-password" />
                    </div>

                    <x-input-error :messages="$errors->get('password')" class="mt-2" />
                </div>

                <div>
                    <x-input-label for="password_confirmation" value="Confirm password" />

                    <div class="mt-2">
                        <x-text-input id="password_confirmation" class="block w-full" type="password" name="password_confirmation" required autocomplete="new-password" />
                    </div>

                    <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
                </div>

                <div>
                    <x-primary-button>
                        Sign up
                    </x-primary-button>
                </div>
            </form>
        </div>

        <p class="mt-10 text-center text-sm/6 text-gray-500">
            Already a member?

            <a href="{{ route("login") }}" class="font-semibold text-blue-600 hover:text-blue-500">
                Login
            </a>
        </p>
    </div>
</x-guest-layout>
