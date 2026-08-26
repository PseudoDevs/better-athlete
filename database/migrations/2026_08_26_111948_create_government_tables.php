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
        Schema::create('government_entities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('type')->default('agency');
            $table->text('description')->nullable();
            $table->string('email')->nullable();
            $table->string('phone', 32)->nullable();
            $table->string('website')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('region')->nullable();
            $table->string('verification_status')->default('unverified');
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();
        });

        Schema::create('funding_programs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('government_entity_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sport_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->unsignedBigInteger('budget');
            $table->unsignedSmallInteger('min_age')->nullable();
            $table->unsignedSmallInteger('max_age')->nullable();
            $table->string('gender')->nullable();
            $table->json('eligible_levels')->nullable();
            $table->json('eligible_regions')->nullable();
            $table->boolean('requires_verified_athlete')->default(true);
            $table->date('application_deadline')->nullable();
            $table->string('status')->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        Schema::create('funding_beneficiaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('funding_program_id')->constrained()->cascadeOnDelete();
            $table->foreignId('athlete_profile_id')->constrained()->cascadeOnDelete();
            $table->foreignId('application_id')->constrained()->cascadeOnDelete();
            $table->unsignedBigInteger('awarded_amount');
            $table->timestamps();

            $table->unique(['funding_program_id', 'athlete_profile_id']);
        });

        Schema::create('funding_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('funding_program_id')->constrained()->cascadeOnDelete();
            $table->string('reference_number')->unique();
            $table->string('transaction_type');
            $table->unsignedBigInteger('amount');
            $table->foreignId('athlete_profile_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('application_id')->nullable()->constrained()->nullOnDelete();
            $table->string('status')->default('recorded');
            $table->text('description')->nullable();
            $table->date('transaction_date')->nullable();
            $table->string('document_path')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('created_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('funding_transactions');
        Schema::dropIfExists('funding_beneficiaries');
        Schema::dropIfExists('funding_programs');
        Schema::dropIfExists('government_entities');
    }
};
