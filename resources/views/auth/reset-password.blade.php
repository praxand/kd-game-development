<x-guest-layout>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form method="POST" action="{{ route("password.store") }}">
                @csrf

                <input type="hidden" name="token" value="{{ $request->route("token") }}">

                <div>
                    <x-input-label for="email" value="Email" />

                    <div class="mt-2">
                        <x-text-input id="email" class="mt-1 block w-full" type="email" name="email" :value="old('email', $request->email)" required autofocus autocomplete="username" />
                    </div>

                    <x-input-error :messages="$errors->get('email')" class="mt-2" />
                </div>

                <div class="mt-4">
                    <x-input-label for="password" value="Password" />

                    <div class="mt-2">
                        <x-text-input id="password" class="mt-1 block w-full" type="password" name="password" required autocomplete="new-password" />
                    </div>

                    <x-input-error :messages="$errors->get('password')" class="mt-2" />
                </div>

                <div class="mt-4">
                    <x-input-label for="password_confirmation" value="Confirm Password" />

                    <div class="mt-2">
                        <x-text-input id="password_confirmation" class="mt-1 block w-full"
                            type="password"
                            name="password_confirmation" required autocomplete="new-password" />
                    </div>

                    <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
                </div>

                <div class="mt-4 flex items-center justify-end">
                    <x-primary-button>
                        Reset Password
                    </x-primary-button>
                </div>
            </form>
        </div>
    </div>
</x-guest-layout>
