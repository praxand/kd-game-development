<!DOCTYPE html>
<html lang="{{ str_replace("_", "-", app()->getLocale()) }}">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config("app.name", "Laravel") }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        @if (file_exists(public_path("build/manifest.json")) || file_exists(public_path("hot")))
            @vite("resources/css/app.css")
        @endif

        @isset($game)
            @if (file_exists(public_path("build/manifest.json")) || file_exists(public_path("hot")))
                @vite("resources/js/app.js")
            @endif
        @endisset
    </head>

    <body class="font-sans antialiased">
        @include("layouts.navigation")

        <main>
            {{ $slot }}
        </main>
    </body>

</html>
