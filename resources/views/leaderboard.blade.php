<x-layouts.app :title="__('Dashboard')">
    <div class="flex h-full w-full flex-1 flex-col gap-4 rounded-xl">
        <div class="overflow-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
            <table class="w-full">
                <thead class="border-b border-neutral-200 dark:border-neutral-700">
                    <tr>
                        <th class="w-20 p-3 text-left text-sm font-semibold tracking-wide">No.</th>
                        <th class="p-3 text-left text-sm font-semibold tracking-wide">Name</th>
                        <th class="w-24 p-3 text-left text-sm font-semibold tracking-wide">Score</th>
                        <th class="w-32 p-3 text-left text-sm font-semibold tracking-wide">Lives</th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-neutral-200 dark:divide-neutral-700">
                    @if ($data->isNotEmpty())
                        @foreach ($data as $score)
                            <tr>
                                <td class="whitespace-nowrap p-3 text-sm text-zinc-500 dark:text-white/80">
                                    {{ $loop->iteration }}
                                </td>

                                <td class="whitespace-nowrap p-3 text-sm text-zinc-500 dark:text-white/80">
                                    {{ $score->user->name }}
                                </td>

                                <td class="whitespace-nowrap p-3 text-sm text-zinc-500 dark:text-white/80">
                                    {{ $score->score }}
                                </td>

                                <td class="whitespace-nowrap p-3 text-sm text-zinc-500 dark:text-white/80">
                                    {{ $score->lives }}
                                </td>
                            </tr>
                        @endforeach
                    @else
                        <tr>
                            <td colspan="4" class="p-3 text-center text-sm text-zinc-500 dark:text-white/80">
                                No scores available
                            </td>
                        </tr>
                    @endif
                </tbody>
            </table>
        </div>
    </div>
</x-layouts.app>
