<x-app-layout>
    <div class="mt-10 max-w-3xl sm:mx-auto sm:w-full">
        <div class="hidden overflow-auto rounded-lg shadow md:block">
            <table class="w-full">
                <thead class="border-b-2 border-gray-200 bg-gray-50">
                    <tr>
                        <th class="w-20 p-3 text-left text-sm font-semibold tracking-wide">
                            No.
                        </th>

                        <th class="p-3 text-left text-sm font-semibold tracking-wide">
                            Name
                        </th>

                        <th class="w-24 p-3 text-left text-sm font-semibold tracking-wide">
                            Score
                        </th>

                        <th class="w-24 p-3 text-left text-sm font-semibold tracking-wide">
                            Lives
                        </th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-100">
                    @foreach ($scores as $score)
                        <tr class="bg-white">
                            <td class="whitespace-nowrap p-3 text-sm text-gray-700">
                                {{ $loop->iteration }}
                            </td>

                            <td class="whitespace-nowrap p-3 text-sm text-gray-700">
                                {{ $score->user->name }}
                            </td>

                            <td class="whitespace-nowrap p-3 text-sm text-gray-700">
                                {{ $score->score }}
                            </td>

                            <td class="whitespace-nowrap p-3 text-sm text-gray-700">
                                {{ $score->lives }}
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</x-app-layout>
