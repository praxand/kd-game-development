<div class="absolute right-5 top-5">
    <div class="w-35 bg-white p-6 shadow sm:rounded-lg">
        <div>
            @if (request()->routeIs("home"))
                <a href="{{ route("leaderboard") }}">Leaderboard</a>
            @else
                <a href="{{ route("home") }}">Home</a>
            @endif
        </div>

        <div>
            <a href="{{ route("account") }}">Account</a>
        </div>

        <form method="POST" action="{{ route("logout") }}">
            @csrf

            <a :href="route('logout')"
                onclick="event.preventDefault();
                            this.closest('form').submit();">
                {{ __("Log Out") }}
            </a>
        </form>
    </div>
</div>
