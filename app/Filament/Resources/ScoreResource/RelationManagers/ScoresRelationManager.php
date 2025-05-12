<?php

namespace App\Filament\Resources\ScoreResource\RelationManagers;

use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Enums\FiltersLayout;
use Filament\Tables\Filters\QueryBuilder;
use Filament\Tables\Filters\QueryBuilder\Constraints\NumberConstraint;
use Filament\Tables\Table;

class ScoresRelationManager extends RelationManager
{
    protected static string $relationship = 'scores';

    protected static ?string $recordTitleAttribute = 'score';

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('score')
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('lives')
                    ->sortable()
                    ->toggleable(),
            ])
            ->filters([
                QueryBuilder::make()
                    ->constraints([
                        NumberConstraint::make('score'),
                        NumberConstraint::make('lives'),
                    ])
            ], layout: FiltersLayout::AboveContentCollapsible)
            ->actions([
                DeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
