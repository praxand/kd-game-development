<x-layouts.app :title="__('Game')">
    <div id="game"></div>

    <script>
        userId = {{ auth()->user()->id }};

        (function() {
            if (window.localStorage) {
                if (!localStorage.getItem('firstLoad')) {
                    localStorage['firstLoad'] = true;
                    window.location.reload();
                } else
                    localStorage.removeItem('firstLoad');
            }
        })();
    </script>
</x-layouts.app>
