<x-app-layout>
    <x-slot name="game"></x-slot>

    <script>
        userId = {{ auth()->id() }};
    </script>
</x-app-layout>
