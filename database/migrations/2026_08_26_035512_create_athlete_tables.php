<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('athlete_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->text('bio')->nullable();
            $table->date('birth_date')->nullable();
            $table->string('gender', 16)->nullable();
            $table->string('photo_path')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('region')->nullable();
            $table->text('current_goal')->nullable();
            $table->timestamps();
        });

        Schema::create('athlete_sports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('athlete_profile_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sport_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sport_discipline_id')->nullable()->constrained()->nullOnDelete();
            $table->string('level')->default('local');
            $table->boolean('is_primary')->default(false);
            $table->timestamps();

            $table->unique(['athlete_profile_id', 'sport_id', 'sport_discipline_id'], 'athlete_sports_unique');
        });

        Schema::create('achievements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('athlete_profile_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('medal')->nullable();
            $table->string('event')->nullable();
            $table->unsignedSmallInteger('year')->nullable();
            $table->string('location')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->timestamps();
        });

        Schema::create('athlete_needs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('athlete_profile_id')->constrained()->cascadeOnDelete();
            $table->string('category');
            $table->string('title');
            $table->text('description')->nullable();
            $table->unsignedBigInteger('target_amount')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('athlete_needs');
        Schema::dropIfExists('achievements');
        Schema::dropIfExists('athlete_sports');
        Schema::dropIfExists('athlete_profiles');
    }
};
